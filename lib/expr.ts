const FUNCTIONS: Record<string, (...args: number[]) => number> = {
  sqrt: Math.sqrt,
  abs: Math.abs,
  round: Math.round,
  floor: Math.floor,
  ceil: Math.ceil,
  min: (...args) => Math.min(...args),
  max: (...args) => Math.max(...args),
  pow: Math.pow,
  log: Math.log10,
  ln: Math.log,
};

type Token =
  | { type: "number"; value: number }
  | { type: "ident"; value: string }
  | { type: "op"; value: "+" | "-" | "*" | "/" | "^" }
  | { type: "lparen" }
  | { type: "rparen" }
  | { type: "comma" };

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      let j = i + 1;
      while (j < input.length && /[0-9.]/.test(input[j])) j++;
      const raw = input.slice(i, j);
      const value = Number(raw);
      if (Number.isNaN(value)) throw new Error(`Invalid number "${raw}"`);
      tokens.push({ type: "number", value });
      i = j;
      continue;
    }
    if (/[a-zA-Z_]/.test(ch)) {
      let j = i + 1;
      while (j < input.length && /[a-zA-Z0-9_]/.test(input[j])) j++;
      tokens.push({ type: "ident", value: input.slice(i, j) });
      i = j;
      continue;
    }
    if ("+-*/^".includes(ch)) {
      tokens.push({ type: "op", value: ch as "+" | "-" | "*" | "/" | "^" });
      i++;
      continue;
    }
    if (ch === "(") {
      tokens.push({ type: "lparen" });
      i++;
      continue;
    }
    if (ch === ")") {
      tokens.push({ type: "rparen" });
      i++;
      continue;
    }
    if (ch === ",") {
      tokens.push({ type: "comma" });
      i++;
      continue;
    }
    throw new Error(`Unexpected character "${ch}"`);
  }
  return tokens;
}

class Parser {
  private pos = 0;
  constructor(
    private tokens: Token[],
    private variables: Record<string, number>,
  ) {}

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  private next(): Token {
    const t = this.tokens[this.pos];
    if (!t) throw new Error("Unexpected end of formula");
    this.pos++;
    return t;
  }

  parse(): number {
    const value = this.parseAddSub();
    if (this.pos < this.tokens.length) {
      throw new Error("Unexpected token after end of formula");
    }
    return value;
  }

  private parseAddSub(): number {
    let value = this.parseMulDiv();
    for (;;) {
      const t = this.peek();
      if (t?.type !== "op" || (t.value !== "+" && t.value !== "-")) break;
      this.next();
      const rhs = this.parseMulDiv();
      value = t.value === "+" ? value + rhs : value - rhs;
    }
    return value;
  }

  private parseMulDiv(): number {
    let value = this.parseUnary();
    for (;;) {
      const t = this.peek();
      if (t?.type !== "op" || (t.value !== "*" && t.value !== "/")) break;
      this.next();
      const rhs = this.parseUnary();
      value = t.value === "*" ? value * rhs : value / rhs;
    }
    return value;
  }

  private parseUnary(): number {
    const t = this.peek();
    if (t?.type === "op" && (t.value === "+" || t.value === "-")) {
      this.next();
      const value = this.parseUnary();
      return t.value === "-" ? -value : value;
    }
    return this.parsePower();
  }

  private parsePower(): number {
    const base = this.parsePrimary();
    const t = this.peek();
    if (t?.type === "op" && t.value === "^") {
      this.next();
      const exponent = this.parseUnary();
      return Math.pow(base, exponent);
    }
    return base;
  }

  private parsePrimary(): number {
    const t = this.next();
    if (t.type === "number") return t.value;
    if (t.type === "lparen") {
      const value = this.parseAddSub();
      if (this.peek()?.type !== "rparen") throw new Error("Missing closing parenthesis");
      this.next();
      return value;
    }
    if (t.type === "ident") {
      if (this.peek()?.type === "lparen") {
        this.next();
        const args: number[] = [];
        if (this.peek()?.type !== "rparen") {
          args.push(this.parseAddSub());
          while (this.peek()?.type === "comma") {
            this.next();
            args.push(this.parseAddSub());
          }
        }
        if (this.peek()?.type !== "rparen") throw new Error("Missing closing parenthesis");
        this.next();
        const fn = FUNCTIONS[t.value];
        if (!fn) throw new Error(`Unknown function "${t.value}"`);
        return fn(...args);
      }
      const value = this.variables[t.value];
      if (value === undefined) throw new Error(`Unknown variable "${t.value}"`);
      return value;
    }
    throw new Error("Unexpected token in formula");
  }
}

export function evaluateExpression(formula: string, variables: Record<string, number>): number {
  const trimmed = formula.trim();
  if (!trimmed) throw new Error("Enter a formula");
  const tokens = tokenize(trimmed);
  if (tokens.length === 0) throw new Error("Enter a formula");
  const result = new Parser(tokens, variables).parse();
  if (Number.isNaN(result)) throw new Error("Result is not a number — check your formula");
  return result;
}
