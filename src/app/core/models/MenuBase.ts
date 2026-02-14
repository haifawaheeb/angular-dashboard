
export class MenuBase {
  constructor(
    public name: string,
    public icon: string,
    public route?: string,
    public children?: MenuBase[]
  ) {}
}
