import Vue from 'vue'

import {
  // ActionSheet,
  // AddressEdit,
  // AddressList,
  // Area,
  Button,
  // Calendar,
  // Card,
  // Cell,
  // CellGroup,
  // Checkbox,
  // CheckboxGroup,
  // Circle,
  // Col,
  // Collapse,
  // CollapseItem,
  // ContactCard,
  // ContactEdit,
  // ContactList,
  // CountDown,
  // Coupon,
  // CouponCell,
  // CouponList,
  DatetimePicker,
  Dialog,
  // Divider,
  // DropdownItem,
  // DropdownMenu,
  Empty,
  // Field,
  // Form,
  // GoodsAction,
  // GoodsActionButton,
  // GoodsActionIcon,
  // Grid,
  // GridItem,
  // Icon,
  // Image,
  // ImagePreview,
  // IndexAnchor,
  // IndexBar,
  // Info,
  // Lazyload,
  // List,
  Loading,
  // Locale,
  // NavBar,
  NoticeBar,
  // Notify,
  // NumberKeyboard,
  // Overlay,
  // Pagination,
  // Panel,
  // PasswordInput,
  // Picker,
  Popup,
  // Progress,
  // PullRefresh,
  // Radio,
  // RadioGroup,
  // Rate,
  // Row,
  // Search,
  // ShareSheet,
  // Sidebar,
  // SidebarItem,
  // Skeleton,
  // Sku,
  // Slider,
  // Step,
  // Stepper,
  // Steps,
  // Sticky,
  // SubmitBar,
  // Swipe,
  // SwipeCell,
  // SwipeItem,
  // Switch,
  // SwitchCell,
  // Tab,
  // Tabbar,
  // TabbarItem,
  // Tabs,
  // Tag,
  // Toast,
  // TreeSelect,
  // Uploader
} from 'vant'

const components = [
  // ActionSheet,
  // AddressEdit,
  // AddressList,
  // Area,
  Button,
  // Calendar,
  // Card,
  // Cell,
  // CellGroup,
  // Checkbox,
  // CheckboxGroup,
  // Circle,
  // Col,
  // Collapse,
  // CollapseItem,
  // ContactCard,
  // ContactEdit,
  // ContactList,
  // CountDown,
  // Coupon,
  // CouponCell,
  // CouponList,
  DatetimePicker,
  Dialog,
  // Divider,
  // DropdownItem,
  // DropdownMenu,
  Empty,
  // Field,
  // Form,
  // GoodsAction,
  // GoodsActionButton,
  // GoodsActionIcon,
  // Grid,
  // GridItem,
  // Icon,
  // Image,
  // ImagePreview,
  // IndexAnchor,
  // IndexBar,
  // Info,
  // Lazyload,
  // List,
  Loading,
  // Locale,
  // NavBar,
  NoticeBar,
  // Notify,
  // NumberKeyboard,
  // Overlay,
  // Pagination,
  // Panel,
  // PasswordInput,
  // Picker,
  Popup,
  // Progress,
  // PullRefresh,
  // Radio,
  // RadioGroup,
  // Rate,
  // Row,
  // Search,
  // ShareSheet,
  // Sidebar,
  // SidebarItem,
  // Skeleton,
  // Sku,
  // Slider,
  // Step,
  // Stepper,
  // Steps,
  // Sticky,
  // SubmitBar,
  // Swipe,
  // SwipeCell,
  // SwipeItem,
  // Switch,
  // SwitchCell,
  // Tab,
  // Tabbar,
  // TabbarItem,
  // Tabs,
  // Tag,
  // Toast,
  // TreeSelect,
  // Uploader
]

components.forEach((item) => {
  if (item.install) {
    Vue.use(item)
  } else if (item.name) {
    Vue.component(item.name, item)
  }
})
