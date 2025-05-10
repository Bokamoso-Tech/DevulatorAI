"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCompletion = generateCompletion;
exports.generateWithFunctionCalling = generateWithFunctionCalling;
var openai_1 = require("@azure/openai");
// Configure the Azure OpenAI client
var endpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
var apiKey = process.env.AZURE_OPENAI_API_KEY || "";
var deploymentName = process.env.AZURE_OPENAI_MODEL || "deployment"; // Name of your model deployment
if (!endpoint || !apiKey) {
    console.error("Azure OpenAI credentials not configured properly!");
}
// Create Azure OpenAI client
var client = new openai_1.OpenAIClient(endpoint, new openai_1.AzureKeyCredential(apiKey));
function generateCompletion(prompt_1) {
    return __awaiter(this, arguments, void 0, function (prompt, maxTokens) {
        var response, error_1;
        var _a;
        if (maxTokens === void 0) { maxTokens = 4000; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    console.log("Using Azure OpenAI deployment: ".concat(deploymentName));
                    return [4 /*yield*/, client.getChatCompletions(deploymentName, [
                            {
                                role: "system",
                                content: "You are an expert Senior Software Engineer and business analyst specializing in South African software development projects. Your task is to create detailed, accurate project plans, cost estimates, feasibility studies, and RFP documents that comply with South African standards and regulations."
                            },
                            {
                                role: "user",
                                content: prompt
                            }
                        ], {
                            maxTokens: maxTokens,
                            temperature: 0.7,
                        })];
                case 1:
                    response = _b.sent();
                    if (!((_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content)) {
                        throw new Error("No content returned from Azure OpenAI");
                    }
                    return [2 /*return*/, response.choices[0].message.content];
                case 2:
                    error_1 = _b.sent();
                    console.error("Error generating Azure OpenAI completion:", error_1);
                    throw new Error("Failed to generate content. Please try again later.");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function generateWithFunctionCalling(prompt, schema, functionName) {
    return __awaiter(this, void 0, void 0, function () {
        var response, functionCall, parsedArguments, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    console.log("Using Azure OpenAI deployment: ".concat(deploymentName, " for function calling"));
                    return [4 /*yield*/, client.getChatCompletions(deploymentName, [
                            {
                                role: "system",
                                content: "You are an expert Senior Software Engineer and business analyst specializing in South African software development projects. Your task is to create detailed, accurate project plans, cost estimates, feasibility studies, and RFP documents that comply with South African standards and regulations."
                            },
                            {
                                role: "user",
                                content: prompt
                            }
                        ], {
                            temperature: 0.7,
                            functions: [
                                {
                                    name: functionName,
                                    parameters: schema
                                }
                            ],
                            functionCall: { name: functionName }
                        })];
                case 1:
                    response = _b.sent();
                    functionCall = (_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.functionCall;
                    if (!functionCall || !functionCall.arguments) {
                        throw new Error("No valid function call returned from Azure OpenAI");
                    }
                    parsedArguments = JSON.parse(functionCall.arguments);
                    return [2 /*return*/, parsedArguments];
                case 2:
                    error_2 = _b.sent();
                    console.error("Error using Azure OpenAI function calling:", error_2);
                    throw new Error("Failed to generate structured content. Please try again later.");
                case 3: return [2 /*return*/];
            }
        });
    });
}
