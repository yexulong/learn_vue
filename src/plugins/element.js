import Vue from 'vue'

import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    DatePicker,
    Select,
    Checkbox,
    CheckboxGroup,
    Option,
    Tag,
    MessageBox,
    Dialog,
    Tree,
    Cascader,
    Alert,
} from "element-ui"

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Option);
Vue.use(Tag);
Vue.use(Dialog);
Vue.use(Tree);
Vue.use(Cascader);
Vue.use(Alert);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;