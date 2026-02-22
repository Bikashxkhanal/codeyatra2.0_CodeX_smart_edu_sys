import { useState } from "react";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import TextArea from "../TextArea/TextArea";
import FormCard from "../FormCard/FormCard";

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint:", formData);
  };

  return (
    <FormCard title="Submit Complaint">
      <form onSubmit={handleSubmit} className="space-y-5">
        <InputBox
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <TextArea
          label="Complaint Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="delete">
          Submit Complaint
        </Button>
      </form>
    </FormCard>
  );
}