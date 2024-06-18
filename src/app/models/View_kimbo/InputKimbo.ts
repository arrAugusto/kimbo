export interface InputKimbo {
  id: number;
  id_bodega_afiliada: string;
  id_group_view: string;
  id_get_formulario: string;
  type_input: string;
  tag: string;
  label: string;
  icon: string;
  size: string;
  required: boolean;
  disabled: boolean;
  pattern: string;
  visible: string; // Cambiado a boolean
  read_only: boolean; // Cambiado a boolean
  editable: boolean; // Cambiado a boolean
  id_icon: string | null;
  type: string | null;
  estado: string;
  options_view_kimbo: OptionViewKimbo[] | null; // Definiendo la estructura de opciones
  value_default: string;
}

interface OptionViewKimbo {
  id: number;
  id_view_kimbo: number;
  valueOption: string;
  textValue: string;
}