import ArrayLiteral from './ArrayLiteral';
import {
  Annotation,
  MantaStyleContext,
  annotationUtils,
  Type,
} from '@manta-style/core';
import { everyPromise } from '../utils/assignable';

export default class ArrayType extends Type {
  private elementType: Type;
  constructor(elementType: Type) {
    super();
    this.elementType = elementType;
  }
  public async deriveLiteral(
    annotations: Annotation[],
    context: MantaStyleContext,
  ) {
    const array: Type[] = [];
    const lengthFromJSDoc = annotationUtils.getNumberFromAnnotationKey({
      key: 'length',
      precision: 0,
      annotations,
    });
    const length =
      typeof lengthFromJSDoc !== 'undefined'
        ? lengthFromJSDoc
        : Math.floor(Math.random() * 5) + 1;

    for (let i = 0; i < length; i++) {
      array.push(await this.elementType.deriveLiteral(annotations, context));
    }
    return new ArrayLiteral(array);
  }
  public async validate(value: unknown, context: MantaStyleContext) {
    return (
      Array.isArray(value) &&
      (await everyPromise(
        value.map((item) => this.elementType.validate(item, context)),
      ))
    );
  }
}
