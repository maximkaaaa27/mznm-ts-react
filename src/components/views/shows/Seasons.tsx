import React from "react";
import { IContentShows, ISeason } from "../../../redux/firebase/interfaces";
import { AddEpisodeBtn } from "../../buttons/AddEpisodeBtn";
import { AddSeasonBtn } from "../../buttons/AddSeasonBtn";
import { RemoveButton } from "../../buttons/RemoveButton";
import { Episodes } from "./Episodes";


export const Seasons = ({ seasons, tvshow, isFullOption } : {
  seasons: ISeason[] | null | undefined, 
  tvshow: IContentShows,
  isFullOption: boolean
}) => (
  <>
    {seasons && seasons.map(season => (
      <div key={ season.seasonId } className="bg-light border my-2 p-3 text-center">
        <h3> { season.seasonNumber } Season {season.year && <>({ season.year })</>}</h3>
        {isFullOption &&  <RemoveButton 
        contentLink="shows/" 
        id={`${tvshow.link}/seasons/${season.seasonNumber}season`}
        />}
        { season.episodes && <Episodes 
        episodes={ season.episodes }  
        seasonNumber={ season.seasonNumber }
        isFullOption={ isFullOption }
        tvShowLink={ tvshow.link }
        />}
        { isFullOption && 
          <AddEpisodeBtn link={ tvshow.link } season={ season.seasonNumber + 'season' } />
        }       
      </div>)
      )
    }
    { tvshow && isFullOption &&
      <AddSeasonBtn id={ tvshow.link } totalSeasons={ tvshow.totalSeasons }/>
    }
  </>
)