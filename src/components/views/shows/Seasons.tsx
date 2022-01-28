import React from "react";
import { IContentShows, ISeason } from "../../../redux/firebase/interfaces";
import { AddEpisodeBtn } from "../../buttons/AddEpisodeBtn";
import { AddSeasonBtn } from "../../buttons/AddSeasonBtn";
import { Episodes } from "./Episodes";


export const Seasons = ({seasons, tvshow, isFullOption} : {
  seasons: ISeason[], 
  tvshow: IContentShows,
  isFullOption: boolean
}) => (
  <>
    {seasons.map(season => (
      <div 
      key={season.seasonId} 
      className="d-flex flex-column flex-shrink-0 p-3 bg-light border-bottom"
      >
      <p className="lead"> {season.seasonNumber} Season {season.year && <>({season.year})</>}</p>
      { season.episodes && <Episodes episodes={season.episodes} />}
      { isFullOption && 
        <AddEpisodeBtn link={tvshow.link} season={season.seasonNumber + 'season'} />
      }       
      </div>)
      )
    }
    { tvshow && isFullOption &&
      <AddSeasonBtn id={tvshow.link} totalSeasons={tvshow.totalSeasons}/>
    }
  </>
)