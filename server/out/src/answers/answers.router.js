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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.answersRouter = void 0;
/**
 * Required External Modules and Interfaces
 */
const express_1 = __importDefault(require("express"));
const AnswerService = __importStar(require("./answers.service"));
/**
 * Router Definition
 */
exports.answersRouter = express_1.default.Router();
/**
 * Controller Definitions
 */
//Get all user answers, to be used in processing
exports.answersRouter.get("/allanswers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const final_results = yield AnswerService.findAll();
        //const final_results: string[] = await AnswerService.findAll();
        res.status(200).send(final_results);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
}));
//SUBMIT THE USER ANSWER 2
exports.answersRouter.post("/submitAnswerNew", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user_answer_new = req.body.basic_ans;
        yield AnswerService.create_user_new(user_answer_new);
        res.sendStatus(201);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
}));
//WORKED
//Start new round
exports.answersRouter.post("/start", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const round = req.body.round;
        yield AnswerService.create_round(round);
        res.status(200).send(round.question);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
//WORKED
//Stop accepting answers
exports.answersRouter.get("/stop", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield AnswerService.stop_round();
        const final_results = yield AnswerService.findAll();
        res.sendStatus(200);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
//WORKED
// answersRouter.post('/join', async(req: Request, res: Response) => {
//   try {
//     const parent: Answer = req.body.parentAnswer;
//     const child: Answer = req.body.childAnswer;
//     await AnswerService.join(parent,child);
//     res.sendStatus(200);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });
//Front end check status
exports.answersRouter.get("/checkactive", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game_status = yield AnswerService.checkIfActive();
        const question = yield AnswerService.getQuestion();
        res.status(200).send({ game_status, question });
    }
    catch (e) {
        res.status(404).send(e.message);
    }
}));
//WORKED
