/* eslint-disable @typescript-eslint/no-explicit-any */

import { Fragment } from 'react';

type EventCard = {
    heading:string,
    subHeading:string
}


const HistoryTimeline = ({ events }:any) => {
  return (
    <div className="flex flex-col gap-y-3 my-4 w-full">
      <Circle />

      {events.map((event:any, key:any) => {
        return <Fragment key={key}>
            <div className="grid grid-cols-[1fr_auto_1fr] gap-x-2 items-center mx-auto">
                {
                    event.direction === 'left'? (
                        <EventCard heading={event.heading} subHeading={event.subHeading}/>
                    ): (
                        <div></div>
                    )
                }

                <Pillar/>

                {
                    event.direction === 'right'? (
                        <EventCard heading={event.heading} subHeading={event.subHeading}/>
                    ): (
                        <div></div>
                    )
                }

            </div>
            <Circle/>
            
        </Fragment>
})}

<Circle/>
    </div>
  );
};

const Circle = () => {
  return <div className="rounded-full w-4 h-4 bg-purple-500 mx-auto"></div>;
};
const Pillar = () => {
  return (
    <div className="rounded-t-full rounded-b-full w-2 h-full bg-blue-600 mx-auto"></div>
  );
};
const EventCard = ({ heading, subHeading }:EventCard) => {
  return (
    <div className="flex flex-col gap-y-2 border shadow-md rounded-xl p-4">
      <div className="text-white text-2xl font-bold pb-3 border-b">{heading}</div>
      <div className="text-sm text-white">{subHeading}</div>
    </div>
  );
};

export default HistoryTimeline;
