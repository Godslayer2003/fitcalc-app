"use client";

import { useState } from "react";
import { Plus, X, RotateCcw } from "lucide-react";
import { evaluateExpression } from "@/lib/expr";

interface Variable {
  id: string;
  name: string;
  value: string;
}

const DEFAULT_VARIABLES: Variable[] = [
  { id: "1", name: "a", value: "10" },
  { id: "2", name: "b", value: "2" },
];
const DEFAULT_FORMULA = "a + b * 2";
const MAX_VARIABLES = 8;
const NAME_PATTERN = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

let nextId = DEFAULT_VARIABLES.length + 1;

export default function CustomCalculator() {
  const [variables, setVariables] = useState<Variable[]>(DEFAULT_VARIABLES);
  const [formula, setFormula] = useState(DEFAULT_FORMULA);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateVariable(id: string, field: "name" | "value", value: string) {
    setVariables((vars) => vars.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
  }

  function addVariable() {
    if (variables.length >= MAX_VARIABLES) return;
    setVariables((vars) => [...vars, { id: String(nextId++), name: "", value: "" }]);
  }

  function removeVariable(id: string) {
    setVariables((vars) => vars.filter((v) => v.id !== id));
  }

  function handleCalculate() {
    setError(null);
    setResult(null);

    const names = new Set<string>();
    const values: Record<string, number> = {};
    for (const v of variables) {
      const name = v.name.trim();
      if (!name) continue;
      if (!NAME_PATTERN.test(name)) {
        setError(`"${name}" isn't a valid variable name — use letters, numbers, or underscore, starting with a letter.`);
        return;
      }
      if (names.has(name)) {
        setError(`Variable name "${name}" is used more than once.`);
        return;
      }
      const num = Number(v.value);
      if (v.value.trim() === "" || Number.isNaN(num)) {
        setError(`Enter a number for "${name}".`);
        return;
      }
      names.add(name);
      values[name] = num;
    }

    try {
      setResult(evaluateExpression(formula, values));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't evaluate that formula.");
    }
  }

  function handleReset() {
    setVariables(DEFAULT_VARIABLES.map((v) => ({ ...v })));
    setFormula(DEFAULT_FORMULA);
    setResult(null);
    setError(null);
  }

  return (
    <div>
      <div className="flex flex-col gap-3">
        {variables.map((v) => (
          <div key={v.id} className="flex items-center gap-2">
            <input
              type="text"
              value={v.name}
              onChange={(e) => updateVariable(v.id, "name", e.target.value)}
              placeholder="name"
              className="w-24 rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
            />
            <span className="text-sm text-zinc-400">=</span>
            <input
              type="number"
              value={v.value}
              onChange={(e) => updateVariable(v.id, "value", e.target.value)}
              placeholder="value"
              className="flex-1 rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
            />
            <button
              onClick={() => removeVariable(v.id)}
              aria-label={`Remove variable ${v.name || ""}`}
              className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-black/5 hover:text-red-500 dark:hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {variables.length < MAX_VARIABLES && (
          <button
            onClick={addVariable}
            className="flex items-center gap-1.5 self-start text-sm font-medium text-accent hover:underline"
          >
            <Plus className="h-3.5 w-3.5" />
            Add variable
          </button>
        )}
      </div>

      <div className="mt-5">
        <label className="mb-1 block text-sm font-medium">Formula</label>
        <input
          type="text"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          placeholder="e.g. a + b * 2, sqrt(a), pow(a, 2)"
          className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 font-mono text-sm dark:border-white/15"
        />
        <p className="mt-1.5 text-xs text-zinc-500">
          Supports + − × ÷ ^ and parentheses, plus sqrt, abs, round, floor, ceil, min, max, pow, log, ln.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={handleCalculate}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Calculate
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      {error && (
        <p className="mt-4 text-sm font-medium text-red-500">{error}</p>
      )}

      {result !== null && !error && (
        <div className="mt-4 rounded-2xl border border-accent/20 bg-accent-soft p-6">
          <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Result
          </div>
          <div className="mt-1 text-4xl font-bold tracking-tight text-accent">
            {Number.isInteger(result) ? result : result.toFixed(4).replace(/\.?0+$/, "")}
          </div>
        </div>
      )}
    </div>
  );
}
