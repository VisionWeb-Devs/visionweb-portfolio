import Link from "./Link";

const ProjectCard = ({ project: { name, image, description } }) => {
  return (
    <div key={name} className="text-white flex w-full items-end gap-3">
      <img src={image} alt={name} className="w-[500px]" />
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-medium text-nowrap">{name}</h3>
        <p className="text-sm text-nowrap">{description}</p>
        <a
          href="https://visionshop.netlify.app/"
          target="_blank"
          className="font-semibold"
        >
          <Link text={"Visit"} />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
