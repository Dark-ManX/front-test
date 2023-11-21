interface IHelpers {
  setCurrency(value: string | null): void;
  getCoefficient(): number;
  createId(): string;
  proceedTotal(value: IArgs): string;
  rounded(value: string): boolean;
}

export interface IType {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

interface IArgs {
  price: string;
  total: number;
}

export class Helpers implements IHelpers {
  public data: IType[];
  public currency: string | null;
  private id: number;
  constructor(arr: IType[]) {
    this.id = 0;
    this.data = arr;
    this.currency = "";
  }

  public setCurrency(value: string | null) {
    // if (!value) return;
    this.currency = value;
  }

  public getCoefficient() {
    return this.data.reduce((acc: number, el: IType): number => {
      if (el.ccy !== this.currency) return acc;
      const coef = 1 / Number(el.buy);
      console.log("within reduce", coef);
      acc = Number(coef.toFixed(5));
      return acc;
    }, 1);
  }

  public createId() {
    return (this.id += 1).toString();
  }

  public rounded(price: string) {
    if (
      Number(price) &&
      this.getCoefficient() * Number(price) > 0.99999 &&
      this.getCoefficient() * Number(price) <= 1
    ) {
      return true;
    }
    return false;
  }

  public proceedTotal({ price, total = 1 }: IArgs) {
    let convertedTotal: number;
    convertedTotal =
      total *
      (this.rounded(price)
        ? Math.round(Number(price) * this.getCoefficient())
        : Number(price) * this.getCoefficient());
    return convertedTotal.toFixed(5);
  }
}
