import { useState } from "react";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import TextArea from "../TextArea/TextArea";
import FormCard from "../FormCard/FormCard";

export default function QueryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Query:", formData);
  };

  return (
    <FormCard title="Ask a Query">
      <form onSubmit={handleSubmit} className="space-y-5">

        <InputBox
          label="Query Title"
          name="querytitle"
          value={formData.querytitle}
          onChange={handleChange}
          required
        />


        <TextArea
          label="Your Query"
          name="query"
          value={formData.query}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="secondary">
          Submit Query
        </Button>
      </form>
    </FormCard>
  );
}