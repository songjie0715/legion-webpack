/**
 * Created by Yinxiong on 2016/12/28.
 */

export const DEFAULT_FENCING_STYLE = {
    strokeColor: '#4b6a7d',
    strokeStyle: 'dashed',
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: '#fff',
    fillOpacity: .5
};

export const HIGHLIGHT_STYLE = {
    strokeColor: '#d63c13',
    strokeStyle: 'dashed',
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: '#ffeae4',
    fillOpacity: .5
};

export const DEFAULT_LINE_STYLE = {
    strokeColor: '#284353',
    strokeWeight: 2
};

export const DEFAULT_LABEL_STYLE = {
    borderRadius: '3px',
    color: 'white',
    backgroundColor: '#284353',
    padding: '0 5px',
    height: '26px',
    lineHeight: '26px',
    cursor: 'pointer',
    border: 'none'
};

export const FENCING_TYPE = {
    RADIUS: 'RADIUS',
    RECTANGLE: 'RECTANGLE',
    POLYGON: 'POLYGON',
    CITY: 'CITY'
};

export const FENCING_TYPE_TEXT = {
    [FENCING_TYPE.RADIUS]: '半径',
    [FENCING_TYPE.RECTANGLE]: '矩形',
    [FENCING_TYPE.POLYGON]: '多边形',
    [FENCING_TYPE.CITY]: '城市',
};

export const DEFAULT_MIN_DISTANCE = 100;
export const DEFAULT_MAX_DISTANCE = 10 * 1000;