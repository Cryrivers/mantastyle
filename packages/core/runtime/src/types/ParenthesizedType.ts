import { Annotation, MantaStyleContext, Type } from '@manta-style/core';

export default class ParenthesizedType extends Type {
  private readonly type: Type;
  constructor(type: Type) {
    super();
    this.type = type;
  }
  public getType() {
    return this.type;
  }
  public deriveLiteral(annotations: Annotation[], context: MantaStyleContext) {
    return this.type.deriveLiteral(annotations, context);
  }
  public validate(value: unknown, context: MantaStyleContext) {
    return this.type.validate(value, context);
  }
}
