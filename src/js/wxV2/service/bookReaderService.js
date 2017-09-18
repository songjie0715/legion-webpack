/**
 * Created by janey on 16/6/8.
 */

import core from "../core/core";

export default {
    changeUserStatus: function(){
        return $.ajax({
            url: core.website_DOMAIN + '/i/tooltip'
        })
    }
}