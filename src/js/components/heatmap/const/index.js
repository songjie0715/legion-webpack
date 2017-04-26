/**
 * Created by Administrator on 2016/11/13.
 */

export const LNG_PER_PIXEL = 0.0000359314;
export const LAT_PER_PIXEL = 0.0000327217;
export const MAX_SIZE = 0.0000359314;
export const RATIO = 1e10;

export const DEFAULT_OPACITY = 80;
export const DEFAULT_MAX = 100;
export const DEFAULT_RADIUS = 30;
export const DEFAULT_GRADIENT = {
	0: 'rgba(0,0,255,0)',
	0.25: "rgba(0,0,255,.25)",
	0.55: "rgba(0,255,0, .55)",
	0.85: "rgba(255,255,0,.85)",
	1.0: "rgba(255,0,0, 1)"
};

export const DEFAUT_GROUP_KEY = 'vdkrl0';
export const SELECTION_MIN_SIZE = 800;
export const SELECTION_MAX_SIZE = 1e4;
export const CONTROL_MODE = {
	DRAG: 0,
	DRAW: 1,
	CAPTURE: 2
};

export const DATA_TYPE = {
	NORMAL: 0,
	SIMPLE: 1
};

export const FILTER_TYPE = {
	ALL: 0,
	WORK: 1,
	WEEKEND: 2
};

export const HEATMAP_STATE = {
	UNPROCESSED: 0,
	PROCESSING: 1,
	PROCESS_FAILURE: 2,
	UPLOADING: 3,
	UPLOAD_ERROR: 4,
	PROCESSED: 5,
	WAITING: 6
};