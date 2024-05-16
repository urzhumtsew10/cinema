import { FC, useEffect, useState } from "react";
import { Actor, useGetActorQuery } from "../../store/api";

interface IActor {
  actorId: string;
  role: string;
}

export const ActorCard: FC<IActor> = ({ actorId, role }) => {
  const { data } = useGetActorQuery(actorId);
  const [currentActor, setCurrentActor] = useState<Actor>();
  useEffect(() => {
    if (data) setCurrentActor(data);
  }, [data]);

  return (
    <div className="actorsSwiper__actorCard">
      <img className="actorCard__img" src={currentActor?.imgPath} alt="photo" />
      <p className="actorCard__title">
        {currentActor?.name} {currentActor?.surname}
      </p>
      <p className="actorCard__role">{role}</p>
    </div>
  );
};
