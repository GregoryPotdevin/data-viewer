import {
  FormHeader,
  FormTabs,
} from './components'

import { 
  AddressField,
  BooleanField,
  ComputedField,
  DateField,
  IconField,
  ListField,
  NumberField,
  RichTextField,
  SelectField,
  StringField,
  TableField,
 } from './fields'

export const fieldTypes = {
  "header": FormHeader,
  "tabs": FormTabs,

  "string": StringField,
  "boolean": BooleanField,
  "richtext": RichTextField,
  "number": NumberField,
  "date": DateField,
  "choice": SelectField,
  "computed": ComputedField,
  "icon": IconField,
  "address": AddressField,

  "list": ListField,
  "table": TableField,
  
  // "bool": BoolField,
  // "integer": NumberInputField,
  // "color": ColorField,
  // "multiselect": MultiSelectField,
  // "toggle": ToggleField,
  // "icon": IconField,
  // "image": ImageField,
  // "address": AddressField,
  // "list": ListField,
  // "table": TableField,
  // "computed": ComputedField,
  // "length": LengthField,
}