import { cmdNm, cmdSm, modals } from "./format";

export class sCmd {
    constructor(cmdOp: cmdSm) {
        Object.assign(this, cmdOp);
    }
}

export class nCmd {
    constructor(cmdOp: cmdNm) {
        Object.assign(this, cmdOp);
    }
}

export class modalsListener {
    constructor(eventOp: modals) {
        Object.assign(this, eventOp);
    }
}