"use client";

import { useState } from "react";

export interface Strategy {
  tokenName: string;
  targetPrice: string;
  notes?: string;
}

export default function ExitStrategy() {
  const [tokenName, setTokenName] = useState<string>("");
  const [targetPrice, setTargetPrice] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [error, setError] = useState<string>("");

  const addStrategy = () => {
    if (!tokenName.trim() || !targetPrice.trim()) {
      setError("Please fill in both Token Name and Target Price.");
      return;
    }
    const newStrategy: Strategy = {
      tokenName: tokenName.trim(),
      targetPrice: targetPrice.trim(),
      notes: notes.trim() || undefined,
    };
    setStrategies((prev) => [...prev, newStrategy]);
    setTokenName("");
    setTargetPrice("");
    setNotes("");
    setError("");
  };

  const deleteStrategy = (index: number) => {
    setStrategies((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setStrategies([]);
  };

  return (
    <section className="w-full max-w-md space-y-4">
      <div className="grid gap-2">
        <label className="block text-sm font-medium">
          Token Name
          <input
            type="text"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </label>
        <label className="block text-sm font-medium">
          Target Price
          <input
            type="text"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </label>
        <label className="block text-sm font-medium">
          Notes
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 block w-full rounded-md border p-2"
          />
        </label>
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
        <button
          onClick={addStrategy}
          className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Strategy
        </button>
      </div>

      <h2 className="text-lg font-semibold">Your Exit Strategies</h2>
      {strategies.length === 0 ? (
        <p className="text-sm text-muted-foreground">No strategies added yet.</p>
      ) : (
        <ul className="space-y-2">
          {strategies.map((s, idx) => (
            <li key={idx} className="flex items-center justify-between rounded-md border p-2">
              <div>
                <p className="font-medium">{s.tokenName}</p>
                <p className="text-sm">Target: {s.targetPrice}</p>
                {s.notes && <p className="text-sm">Notes: {s.notes}</p>}
              </div>
              <button
                onClick={() => deleteStrategy(idx)}
                className="rounded-md bg-red-600 px-2 py-1 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {strategies.length > 0 && (
        <button
          onClick={clearAll}
          className="mt-2 rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          Clear All
        </button>
      )}
    </section>
  );
}
