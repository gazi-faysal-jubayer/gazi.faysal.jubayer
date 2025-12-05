"use client";

import { useState } from "react";
import { useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";
import { Delete } from "lucide-react";

type CalculatorMode = "standard" | "scientific" | "converter";

const UNIT_CONVERSIONS = {
  pressure: [
    { name: "PSI", factor: 1 },
    { name: "Bar", factor: 0.0689476 },
    { name: "kPa", factor: 6.89476 },
    { name: "MPa", factor: 0.00689476 },
  ],
  length: [
    { name: "mm", factor: 1 },
    { name: "cm", factor: 0.1 },
    { name: "inch", factor: 0.0393701 },
    { name: "foot", factor: 0.00328084 },
    { name: "meter", factor: 0.001 },
  ],
  temperature: [
    { name: "°C", convert: (v: number) => v },
    { name: "°F", convert: (v: number) => (v * 9) / 5 + 32 },
    { name: "K", convert: (v: number) => v + 273.15 },
  ],
};

export default function EngCalculator() {
  const { isDarkMode } = useOSStore();
  const [mode, setMode] = useState<CalculatorMode>("standard");
  const [display, setDisplay] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [newNumber, setNewNumber] = useState<boolean>(true);

  // Converter state
  const [conversionType, setConversionType] = useState<keyof typeof UNIT_CONVERSIONS>("pressure");
  const [fromUnit, setFromUnit] = useState<number>(0);
  const [toUnit, setToUnit] = useState<number>(1);
  const [convertValue, setConvertValue] = useState<string>("1");

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperation = (op: string) => {
    if (previousValue && operation && !newNumber) {
      calculate();
    } else {
      setPreviousValue(display);
    }
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = () => {
    const prev = parseFloat(previousValue);
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        result = current !== 0 ? prev / current : 0;
        break;
      case "^":
        result = Math.pow(prev, current);
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setPreviousValue("");
    setOperation("");
    setNewNumber(true);
  };

  const handleScientific = (func: string) => {
    const current = parseFloat(display);
    let result = 0;

    switch (func) {
      case "sin":
        result = Math.sin((current * Math.PI) / 180);
        break;
      case "cos":
        result = Math.cos((current * Math.PI) / 180);
        break;
      case "tan":
        result = Math.tan((current * Math.PI) / 180);
        break;
      case "√":
        result = Math.sqrt(current);
        break;
      case "x²":
        result = current * current;
        break;
      case "ln":
        result = Math.log(current);
        break;
      case "log":
        result = Math.log10(current);
        break;
      case "π":
        setDisplay(Math.PI.toString());
        setNewNumber(true);
        return;
      case "e":
        setDisplay(Math.E.toString());
        setNewNumber(true);
        return;
      default:
        return;
    }

    setDisplay(result.toString());
    setNewNumber(true);
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue("");
    setOperation("");
    setNewNumber(true);
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
      setNewNumber(true);
    }
  };

  const convertUnits = () => {
    const value = parseFloat(convertValue);
    if (isNaN(value)) return "0";

    const type = UNIT_CONVERSIONS[conversionType];
    
    if (conversionType === "temperature") {
      const tempConversions = type as { name: string; convert: (v: number) => number }[];
      const celsiusValue = 
        fromUnit === 0 ? value : // from Celsius
        fromUnit === 1 ? (value - 32) * 5 / 9 : // from Fahrenheit
        value - 273.15; // from Kelvin
      
      const result = tempConversions[toUnit].convert(celsiusValue);
      return result.toFixed(4);
    } else {
      const unitConversions = type as { name: string; factor: number }[];
      const baseValue = value / unitConversions[fromUnit].factor;
      const result = baseValue * unitConversions[toUnit].factor;
      return result.toFixed(6);
    }
  };

  const buttonClass = cn(
    "p-3 rounded-lg font-medium transition-all active:scale-95",
    isDarkMode
      ? "bg-white/10 hover:bg-white/20 text-white"
      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
  );

  const operatorClass = cn(
    "p-3 rounded-lg font-medium transition-all active:scale-95",
    isDarkMode
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-blue-500 hover:bg-blue-600 text-white"
  );

  return (
    <div
      className={cn(
        "flex flex-col h-full",
        isDarkMode ? "bg-[#202020]" : "bg-gray-50"
      )}
    >
      {/* Mode selector */}
      <div
        className={cn(
          "flex border-b",
          isDarkMode ? "bg-[#1a1a1a] border-white/10" : "bg-white border-gray-200"
        )}
      >
        {(["standard", "scientific", "converter"] as CalculatorMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "flex-1 py-2 px-4 text-sm font-medium capitalize transition-colors",
              mode === m
                ? isDarkMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500 text-white"
                : isDarkMode
                ? "text-white/60 hover:text-white/80"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {mode === "converter" ? (
        <div className="flex-1 p-4 space-y-4">
          {/* Conversion Type */}
          <div className="space-y-2">
            <label className={cn("text-sm font-medium", isDarkMode ? "text-white" : "text-gray-700")}>
              Conversion Type
            </label>
            <select
              value={conversionType}
              onChange={(e) => setConversionType(e.target.value as keyof typeof UNIT_CONVERSIONS)}
              className={cn(
                "w-full p-2 rounded border outline-none",
                isDarkMode
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              )}
            >
              <option value="pressure">Pressure</option>
              <option value="length">Length</option>
              <option value="temperature">Temperature</option>
            </select>
          </div>

          {/* From */}
          <div className="space-y-2">
            <label className={cn("text-sm font-medium", isDarkMode ? "text-white" : "text-gray-700")}>
              From
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={convertValue}
                onChange={(e) => setConvertValue(e.target.value)}
                className={cn(
                  "flex-1 p-2 rounded border outline-none",
                  isDarkMode
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                )}
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(parseInt(e.target.value))}
                className={cn(
                  "p-2 rounded border outline-none",
                  isDarkMode
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                )}
              >
                {UNIT_CONVERSIONS[conversionType].map((unit, idx) => (
                  <option key={idx} value={idx}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* To */}
          <div className="space-y-2">
            <label className={cn("text-sm font-medium", isDarkMode ? "text-white" : "text-gray-700")}>
              To
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={convertUnits()}
                readOnly
                className={cn(
                  "flex-1 p-2 rounded border outline-none",
                  isDarkMode
                    ? "bg-white/5 border-white/20 text-white"
                    : "bg-gray-100 border-gray-300 text-gray-900"
                )}
              />
              <select
                value={toUnit}
                onChange={(e) => setToUnit(parseInt(e.target.value))}
                className={cn(
                  "p-2 rounded border outline-none",
                  isDarkMode
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                )}
              >
                {UNIT_CONVERSIONS[conversionType].map((unit, idx) => (
                  <option key={idx} value={idx}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Display */}
          <div
            className={cn(
              "px-4 py-6 text-right text-3xl font-light border-b overflow-x-auto",
              isDarkMode
                ? "bg-[#1a1a1a] border-white/10 text-white"
                : "bg-white border-gray-200 text-gray-900"
            )}
          >
            {previousValue && operation && (
              <div className="text-sm text-gray-500 mb-1">
                {previousValue} {operation}
              </div>
            )}
            <div className="truncate">{display}</div>
          </div>

          {/* Buttons */}
          <div className="flex-1 p-4">
            {mode === "scientific" ? (
              <div className="grid grid-cols-5 gap-2 h-full">
                {/* Scientific functions */}
                <button onClick={() => handleScientific("sin")} className={buttonClass}>
                  sin
                </button>
                <button onClick={() => handleScientific("cos")} className={buttonClass}>
                  cos
                </button>
                <button onClick={() => handleScientific("tan")} className={buttonClass}>
                  tan
                </button>
                <button onClick={() => handleScientific("√")} className={buttonClass}>
                  √
                </button>
                <button onClick={() => handleOperation("^")} className={operatorClass}>
                  x^y
                </button>

                <button onClick={() => handleScientific("ln")} className={buttonClass}>
                  ln
                </button>
                <button onClick={() => handleScientific("log")} className={buttonClass}>
                  log
                </button>
                <button onClick={() => handleScientific("x²")} className={buttonClass}>
                  x²
                </button>
                <button onClick={() => handleScientific("π")} className={buttonClass}>
                  π
                </button>
                <button onClick={() => handleScientific("e")} className={buttonClass}>
                  e
                </button>

                {/* Standard buttons */}
                <button onClick={clear} className={operatorClass}>
                  C
                </button>
                <button onClick={backspace} className={operatorClass}>
                  <Delete size={18} />
                </button>
                <button onClick={() => handleOperation("÷")} className={operatorClass}>
                  ÷
                </button>
                <button onClick={() => handleOperation("×")} className={operatorClass}>
                  ×
                </button>
                <button onClick={() => handleOperation("-")} className={operatorClass}>
                  −
                </button>

                <button onClick={() => handleNumber("7")} className={buttonClass}>
                  7
                </button>
                <button onClick={() => handleNumber("8")} className={buttonClass}>
                  8
                </button>
                <button onClick={() => handleNumber("9")} className={buttonClass}>
                  9
                </button>
                <button onClick={() => handleNumber("4")} className={buttonClass}>
                  4
                </button>
                <button onClick={() => handleNumber("5")} className={buttonClass}>
                  5
                </button>

                <button onClick={() => handleNumber("6")} className={buttonClass}>
                  6
                </button>
                <button onClick={() => handleNumber("1")} className={buttonClass}>
                  1
                </button>
                <button onClick={() => handleNumber("2")} className={buttonClass}>
                  2
                </button>
                <button onClick={() => handleNumber("3")} className={buttonClass}>
                  3
                </button>
                <button onClick={() => handleNumber("0")} className={buttonClass}>
                  0
                </button>

                <button onClick={handleDecimal} className={buttonClass}>
                  .
                </button>
                <button onClick={() => handleOperation("+")} className={operatorClass}>
                  +
                </button>
                <button onClick={calculate} className={cn(operatorClass, "col-span-3")}>
                  =
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 h-full">
                <button onClick={clear} className={operatorClass}>
                  C
                </button>
                <button onClick={backspace} className={operatorClass}>
                  <Delete size={18} />
                </button>
                <button onClick={() => handleOperation("÷")} className={operatorClass}>
                  ÷
                </button>
                <button onClick={() => handleOperation("×")} className={operatorClass}>
                  ×
                </button>

                <button onClick={() => handleNumber("7")} className={buttonClass}>
                  7
                </button>
                <button onClick={() => handleNumber("8")} className={buttonClass}>
                  8
                </button>
                <button onClick={() => handleNumber("9")} className={buttonClass}>
                  9
                </button>
                <button onClick={() => handleOperation("-")} className={operatorClass}>
                  −
                </button>

                <button onClick={() => handleNumber("4")} className={buttonClass}>
                  4
                </button>
                <button onClick={() => handleNumber("5")} className={buttonClass}>
                  5
                </button>
                <button onClick={() => handleNumber("6")} className={buttonClass}>
                  6
                </button>
                <button onClick={() => handleOperation("+")} className={operatorClass}>
                  +
                </button>

                <button onClick={() => handleNumber("1")} className={buttonClass}>
                  1
                </button>
                <button onClick={() => handleNumber("2")} className={buttonClass}>
                  2
                </button>
                <button onClick={() => handleNumber("3")} className={buttonClass}>
                  3
                </button>
                <button onClick={calculate} className={cn(operatorClass, "row-span-2")}>
                  =
                </button>

                <button onClick={() => handleNumber("0")} className={cn(buttonClass, "col-span-2")}>
                  0
                </button>
                <button onClick={handleDecimal} className={buttonClass}>
                  .
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

