import { LoginForm} from "../../../atomic/molecule";
import { CardForm } from "../../../atomic/organism";
import { PublicTemplate } from "../../../atomic/template/public-template";

export default function Login() {
  return (
    <PublicTemplate>
      <CardForm type={"login"}>
        <LoginForm/>
      </CardForm>
    </PublicTemplate>
  );
}