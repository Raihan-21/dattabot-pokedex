import React from "react";

const Card = ({
  data,
  isLoading,
  onClose,
}: {
  data: any;
  isLoading: boolean;
  onClose: () => void;
}) => {
  return (
    <div className="relative bg-white rounded-md max-h-full w-full max-w-[500px] z-1 ">
      {isLoading ? (
        <p className="p-4">Loading...</p>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center gap-x-4 mb-4 p-4">
            <div className="bg-gray-200 h-fit p-2">
              <img
                src={data && data.sprites.front_default}
                alt=""
                className="mb-4 w-[96px] h-[96px]"
              />
            </div>
            <div>
              <p className="mb-2">#{data && data.id}</p>
              <p className="text-[30px] font-bold text-secondary capitalize">
                {data && data.name}
              </p>
              <p>Base exp: {data && data.base_experience}</p>
              <p>Height: {data && data.height}</p>
              <p>Weight: {data && data.weight}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 max-h-[300px] bg-gray-200 p-4 overflow-y-scroll">
            <div className="space-y-2">
              <div>
                <p className="text-lg text-secondary font-bold">Stats</p>
                {data &&
                  data.stats.length &&
                  data.stats.map((stat: any, i: number) => (
                    <p className="capitalize" key={i}>
                      {stat.stat.name}: {stat.base_stat}
                    </p>
                  ))}
              </div>
              <div>
                <p className="text-lg text-secondary font-bold">Types</p>
                {data &&
                  data.types.length &&
                  data.types.map((type: any, i: number) => (
                    <p className="capitalize" key={i}>
                      {type.type.name}
                    </p>
                  ))}
              </div>
              <div>
                <p className="text-lg text-secondary font-bold">Abilities</p>
                {data &&
                  data.abilities.length &&
                  data.abilities.map((ability: any, i: number) => (
                    <p className="capitalize" key={i}>
                      {ability.ability.name}
                    </p>
                  ))}
              </div>
            </div>
            <div className=" pb-4">
              <p className="font-bold text-lg text-secondary ">Moves</p>
              {data &&
                data.moves.length &&
                data.moves.map((move: any, i: number) => (
                  <p className="capitalize" key={i}>
                    {move.move.name}
                  </p>
                ))}
            </div>
          </div>
          <button
            className="bg-primary text-white absolute top-4 right-4 py-2 px-6 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
