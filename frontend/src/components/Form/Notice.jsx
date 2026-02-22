import { useState } from "react";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import TextArea from "../TextArea/TextArea";
import RadioGroup from "../RadioGroup/RadioGroup";
import FormCard from "../FormCard/FormCard";

export default function NoticeForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    expiryDate: "",
    type: "general",
    specificEmail: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Notice:", formData);
  };

  return (
    <FormCard title="Create Notice">
      <form onSubmit={handleSubmit} className="space-y-6">

        <InputBox
          label="Notice Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <RadioGroup
          label="Notice Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={[
            { label: "General (All Users)", value: "general" },
            { label: "Specific (Single User)", value: "specific" },
          ]}
        />

        {formData.type === "specific" && (
          <InputBox
            type="email"
            label="User Email"
            name="specificEmail"
            value={formData.specificEmail}
            onChange={handleChange}
            required
          />
        )}

        <TextArea
          label="Notice Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="create">
          Publish Notice
        </Button>
      </form>
    </FormCard>
  );
}