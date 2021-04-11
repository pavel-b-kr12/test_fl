import { exec } from 'child_process';

const NDSCLT_BIN = '/usr/bin/ndsctl';
const NDSCLT_SOCK = '/tmp/opennds/ndsctl.sock';
const NDSCLT_FILTERS = {
    'status': 'Current clients'
}
let NDSCLT_CMD = `${NDSCLT_BIN} -s ${NDSCLT_SOCK}`;

class NdsCtl {
    constructor() {

    }

    exec_cmd(command) {
        return exec(`${NDSCLT_CMD} ${command} | grep "${NDSCLT_FILTERS[command]}"`);
    }
}

export default NdsCtl;