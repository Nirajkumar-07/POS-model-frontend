export class API {
  static BASE_URL = "http://localhost:8000/api";

  // ============================================= AUTH ==================================================
  static Signup = this.BASE_URL + "/auth/signup";
  static Login = this.BASE_URL + "/auth/login";

  // ============================================= SUPPLIER ==============================================
  static Supplier_Get_List = this.BASE_URL + "/supplier/list";
  static Supplier_Get = this.BASE_URL + "/supplier/details/";
  static Supplier_Add = this.BASE_URL + "/supplier/add";
  static Supplier_Update = this.BASE_URL + "/supplier/update/";
  static Supplier_Delete = this.BASE_URL + "/supplier/delete/";
  static Supplier_Add_Document = this.BASE_URL + "/supplier/document/add/";
  static Supplier_Send_Msg = this.BASE_URL + "/supplier/send-msg/";
  static Supplier_Update_Review = this.BASE_URL + "/supplier/update-review/";
}
