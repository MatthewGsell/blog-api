import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Maincheck() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/signup");
  });
}

export default Maincheck;
