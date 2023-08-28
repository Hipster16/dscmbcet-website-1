import './Events.css'

import { useContext, useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import EarthClouds from '../home/components/EarthClouds'
import EventComp from './components/EventComp'
import FilledButton from '../../components/FilledButton'
import { ThemeContext } from '../../context/theme-context'
import searchIcon from '../../assets/icons8-search-50.png'
import EventBalloon1 from './components/EventBalloon1'
import EventBalloon2 from './components/EventBalloon2'
import { eventData } from './eventData'
import { DocumentData, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase-config'

function Events() {
    const { theme, setTheme } = useContext(ThemeContext);
    const [eventsLoading, setEventsLoading] = useState(false);
    const [docs, setDocs] = useState<DocumentData[] | null>(null);
    useEffect(() => {
        setEventsLoading(true);
        const unsub = onSnapshot(collection(db, 'events'), (snapshot) => {
            setDocs(snapshot.docs.map((doc) => {return {...doc.data(), id: doc.id}}));
            setEventsLoading(false);
        });
        return () => {
            console.log(docs); 
            setEventsLoading(false);
            unsub();
        };
    }, []);

  return (
    <div>
        <NavBar/>
      <div className="Events_header">
        <EarthClouds theme={theme} id='Events_cloud'/>
        <div className='events_balloon'>
          <EventBalloon1/>
          <EventBalloon2/>
        </div>
        <div style={{margin: "90px"}}></div>
        <p>Events</p>
        <p className='Events_header_desc'>let's do cool things that matter</p>
      </div>
      <div className="events_section">
        <div className='events_searchbar'>
            <label htmlFor="" className='events_searchbar_label'>
                <img src={searchIcon} alt="icon" style={{scale: "50%"}}/>
            </label>
            <input type="search" placeholder='search'  className='events_searchbar_input'/>
        </div>
        <div className="events_filter_container">
            <div className='events_filter'>
              <FilledButton text={"All"} textColor={theme != "dark" ? "black" : "white"} bgColor={theme === "dark" ? "var(--cream)" : "black" } border={true}  id='events'/>
              <FilledButton text={"Design"} textColor={theme != "dark" ? "black" : "white"} bgColor={theme === "dark" ? "var(--cream)" : "black" } border={true}  id='events'/>
              <FilledButton text={"Web"} textColor={theme != "dark" ? "black" : "white"} bgColor={theme === "dark" ? "var(--cream)" : "black" } border={true}   id='events'/>
              <FilledButton text={"App"} textColor={theme != "dark" ? "black" : "white"} bgColor={theme === "dark" ? "var(--cream)" : "black" } border={true}  id='events'/>
              <FilledButton text={"AI/ML"} textColor={theme != "dark" ? "black" : "white"} bgColor={theme === "dark" ? "var(--cream)" : "black" } border={true}  id='events'/>
              <FilledButton text={"Others"} textColor={theme != "dark" ? "black" : "white"} bgColor={theme === "dark" ? "var(--cream)" : "black" } border={true}  id='events'/>
          </div>
        </div>

        <div className="events_container">
                {docs?.map((data, ind) => <EventComp key={ind} theme={theme} eventData={data}/>)}
            {/* {eventData.map((event, index)=> <EventComp key={index} theme={theme} eventData={event}/>)} */}
        </div>
      </div>
    </div>
  )
}

export default Events
