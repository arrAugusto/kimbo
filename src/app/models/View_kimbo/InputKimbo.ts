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
  required: boolean; // Note: This might be better as a boolean if "TRUE"/"FALSE" are meant to represent true/false
  disabled: boolean; // Same as above, consider using boolean
  pattern: string;
  visible: string; // Consider boolean
  read_only: string; // Consider boolean
  editable: string; // Consider boolean
  id_icon: string | null;
  type: string | null;
  estado: string;
}
