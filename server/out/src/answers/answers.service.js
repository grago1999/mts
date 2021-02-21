"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestion = exports.checkIfActive = exports.stop_round = exports.create_round = exports.create_user_new = exports.findAll = void 0;
const WordProcessing = __importStar(require("../../processing/processing"));
/**
 * In-Memory Store
 */
let user_answers = {};
let backend_answers = {};
let current_round = { question: "Init", active: false };
let unsorted_groups = {};
let answer_array = [];
/**
 * Service Methods
 */
exports.findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    unsorted_groups = WordProcessing.returnGroups(answer_array);
    let final_tally = WordProcessing.topN(unsorted_groups, 6);
    //let final_tally: TopAnswers = {name: "string", count:2};
    return final_tally;
});
// export const findAll = async (): Promise<string[]> => {
//    return answer_array;
// };
// export const create = async (newAnswer: Answer): Promise<void> => {
//   const id = new Date().valueOf();
//   answers[id] = {
//     ...newAnswer,
//     id,
//     children: []
//   };
// };
exports.create_user_new = (newAnswer) => __awaiter(void 0, void 0, void 0, function* () {
    if (current_round.active == true) {
        answer_array.push(newAnswer.answer);
    }
});
exports.create_round = (newRound) => __awaiter(void 0, void 0, void 0, function* () {
    answer_array.length = 0;
    current_round.question = newRound.question;
    current_round.active = true;
});
exports.stop_round = () => __awaiter(void 0, void 0, void 0, function* () {
    current_round.active = false;
});
exports.checkIfActive = () => __awaiter(void 0, void 0, void 0, function* () {
    return current_round.active;
});
exports.getQuestion = () => __awaiter(void 0, void 0, void 0, function* () {
    return current_round.question;
});
// export const join = async (parent: Answer, child: Answer): Promise<void> => {
//   const newParent = await find(parent.id);
//   const newChild = await find(child.id);
//   // First check to make sure the parent doesn't contain the child
//   if (!newParent.children.some(answer => answer.id === newChild.id)) {
//     parent.children.push(newChild);
//   }
// }
