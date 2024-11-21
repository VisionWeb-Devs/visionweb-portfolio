import React from "react";

const ProjectCard = ({ project: { name, image, description } }) => {
  console.log(name, image, description);
  return (
    <div key={name} className="text-white flex items-end gap-3">
      <img src={image} alt={name} className="flex-1" />
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="text-xl font-medium text-nowrap">{name}</h3>
        <p className="text-sm text-nowrap">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
