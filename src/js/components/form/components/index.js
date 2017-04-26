/**
 * Created by Yinxiong on 2016/10/12.
 */

import Input from './Input.vue';
import Select from './Select.vue';
import Button from './Button.vue';
import ButtonGroup from './ButtonGroup.vue';
import Checkbox from './Checkbox.vue';
import CheckboxGroup from './CheckboxGroup.vue';
import RadioGroup from './RadioGroup.vue';
import Hidden from './Hidden.vue';
import Divider from './Divider.vue';
import Textarea from './Textarea.vue';
import DateInput from './DateInput.vue';
import Uploader from './Uploader.vue';
import SearchSelector from './SearchSelector.vue';
import SearchSelector2 from './SearchSelector2.vue';
import _ from 'lodash';

export const components = {
	[Input.name]: Input,
	[Select.name]: Select,
	[Button.name]: Button,
	[ButtonGroup.name]: ButtonGroup,
	[Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
	[RadioGroup.name]: RadioGroup,
	[Hidden.name]: Hidden,
	[Textarea.name]: Textarea,
	[Divider.name]: Divider,
	[DateInput.name]: DateInput,
	[Uploader.name]: Uploader,
    [SearchSelector.name]: SearchSelector,
    [SearchSelector2.name]: SearchSelector2
};

let dict = {};
_.each(components, function (com, key) {
	dict[com.Type] = key;
});

export const reference = dict;