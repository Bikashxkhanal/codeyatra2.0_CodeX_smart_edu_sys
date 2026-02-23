import { useState } from "react";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import TextArea from "../TextArea/TextArea";
import FormCard from "../FormCard/FormCard";

export default function CollaborationForm() {
  const [formData, setFormData] = useState({
    company: "",
    contactPerson: "",
    email: "",
    proposal: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Collaboration:", formData);
  };

  return (
    <div className="form-page-bg flex items-center">
      <FormCard title="Collaboration Request" className="w-full max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-5">

        <InputBox
          label="Collaboration Title"
          name="collaboration Title"
          value={formData.collaborationtitle}
          onChange={handleChange}
          required
        />

        <TextArea
          label="Proposal"
          name="proposal"
          value={formData.proposal}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="primary">
          Send Proposal
        </Button>
      </form>
    </FormCard>
    </div>
  );
}
