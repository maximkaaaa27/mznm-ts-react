import React from "react";
import { IContentShows, ISeason } from "../../../redux/firebase/interfaces";
import { AddEpisodeBtn } from "../../buttons/adds/AddEpisodeBtn";
import { AddSeasonBtn } from "../../buttons/adds/AddSeasonBtn";
import { RemoveButton } from "../../buttons/RemoveButton";
import { Episodes } from "./Episodes";


export const Seasons = ({ seasons, tvshow, isFullOption } : {
  seasons: ISeason[] | null | undefined, 
  tvshow: IContentShows,
  isFullOption: boolean
}) => (
  <div className="seasons">
    { seasons?.map(season => (
      <div key={season.seasonId} className="season">

        <div className="season__title">
          {season.seasonNumber} Season {season.year && <>({season.year})</>}
        </div>

        <div className="season__tools">
          { isFullOption && 
          <>
            <div className="add-button">
              <p>Add Episode</p>
              <AddEpisodeBtn 
                link={tvshow.link} 
                season={season.seasonNumber + 'season'} 
              />
            </div>

            <div className="remove-button">
            <p>Delete Season</p>
              <RemoveButton
                contentLink="shows/"
                id={`${tvshow.link}/seasons/${season.seasonNumber}season`} />
            </div>
          </> }
        </div>

        <div className="season__episodes">
          { season.episodes && 
          <Episodes
            episodes={season.episodes}
            seasonNumber={season.seasonNumber}
            isFullOption={isFullOption}
            tvShowLink={tvshow.link} /> }
        </div>
      </div>
      )
    )}

    { tvshow && isFullOption &&
    <div>
      <p>Add Season</p>
      <AddSeasonBtn id={ tvshow.link } totalSeasons={ tvshow.totalSeasons }/>
    </div>
    }
  </div>
)