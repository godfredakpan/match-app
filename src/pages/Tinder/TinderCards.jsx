import React, { useState, useEffect} from 'react';

// import css
import './TinderCards.css';

import { getAllModerators } from '../../services/user';
import { generateFemaleModerator, generateMaleModerator } from '../elements/GeneratePeople';
import { ToastContainer, toast } from 'react-toastify';


import SideBar from '../../components/SideBar';
import sentenceCase from '../elements/SentenceCase';
import SwipeCard from './SwipeCard';


function TinderCards() {

    const [lastIndex, setLastIndex] = useState(20);

    const [loading, setLoading] = useState(false);

    const [hasMore, setHasMore] = useState(true);
    
    const [people, setPeople] = useState([
        {
            name: 'Loading...',
            avatarImage: 'https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif'
        },
        {
            name: 'Loading...',
            avatarImage: 'https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif'
        },
    ]);

    const [staticPeople, setStaticPeople] = useState([]);
    const [cardOpen, toggleFilterCard] = useState(false);
    const [values, setValues] = useState({
        minAge: 18,
        maxAge: 30,
        gender: "",
        region: "",
        appearance: "",
        hairColor: "",

    });
    

    useEffect(() => {
        async function fetchData() {
            const response = await getAllModerators();
            const shuffledPeople = response.sort(() => Math.random() - 0.5);
            setPeople(shuffledPeople)
            setStaticPeople(shuffledPeople)
            // generateModerator()
        };
        fetchData();
    }, []);



    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });

        if (event.target.name === 'minAge') {
            sortByAge(event.target.value, values.maxAge)
        }

        if (event.target.name === 'maxAge') {
            sortByAge(values.minAge, event.target.value)
        }

        // gender 
        if (event.target.name === 'gender') {
            sortByGender(event.target.value)
        }

        // region
        if (event.target.name === 'region') {
            sortByRegion(event.target.value)
        }

        // appearance
        // if (event.target.name === 'appearance') {
        //     sortByAppearance(event.target.value)
        // }

        // hair color
        // if (event.target.name === 'hairColor') {
        //     sortByHairColor(event.target.value)
        // }

    };


    const generateFeMale = () => {
        generateFemaleModerator();
    }

    const generateMale = () => {
        generateMaleModerator();
    }
    // sort people by age min and max
    const sortByAge = (min, max) => {
        const sortedPeople = staticPeople.filter((person) => {
            return person.age >= min && person.age <= max
        })
        setPeople(sortedPeople)
    }

    const sortByGender = (gender) => {

        const sortedPeople = staticPeople.filter((person) => {
            return person.gender === sentenceCase(gender)
        })
        setPeople(sortedPeople)
    }

    // sort by region
    const sortByRegion = (region) => {
        const sortedPeople = staticPeople.filter((person) => {
            return person.region === sentenceCase(region)
        })
        setPeople(sortedPeople)
    }

    // sort by appearance
    const sortByAppearance = (appearance) => {
        const sortedPeople = staticPeople.filter((person) => {
            return person.appearance === sentenceCase(appearance)
        })
        setPeople(sortedPeople)
    }

    // sort by hair color
    const sortByHairColor = (hairColor) => {
        const sortedPeople = staticPeople.filter((person) => {
            return person.hairColor === sentenceCase(hairColor)
        })
        setPeople(sortedPeople)
    }

    // sort by all filters
    const sortByAll = (min, max, gender, region, appearance, hairColor) => {
        const sortedPeople = staticPeople.filter((person) => {
            return person.age >= min && person.age <= max && person.region === sentenceCase(region) && person.appearance === sentenceCase(appearance) && person.hairColor === sentenceCase(hairColor)
        })
        setPeople(sortedPeople)
    }

    function handleSwipe(id, direction) {
        setPeople(prevData => people.filter(card => card._id !== id));
        console.log(`Swiped ${direction} on card ${id}`);
      }


        useEffect(() => {
            if (loading) {
                return;
            }
            if (lastIndex >= people.length) {
                setHasMore(false);
                return;
            }
            function fetchData() {
                setLoading(true);
                setTimeout(() => {
                    setLastIndex(lastIndex + 20);
                    setLoading(false);
                }, 90000);
            }
            fetchData();
        }, [loading, lastIndex, people.length]);

        const handleScroll = (e) => {
            const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
            if (scrollHeight - scrollTop === clientHeight) {
                setLoading(true);
            }
        };


    return (
        <>
          <ToastContainer />
            <div className='row'>

                <div className='col-md-8' style={{ marginTop: '50px' }}>
                    <div style={{cursor: 'pointer'}} className='filter-button container' onClick={() => toggleFilterCard(!cardOpen)}>
                        <span className='btn-filter'>{cardOpen ? 'Close Filter' : 'Filter Result'}  <i className='fa fa-filter' style={{ color: 'white', marginRight: '20px' }} /></span>
                           
                    </div><br/>
                    { cardOpen && 
                    <div class="filter container">
                        <div class="filter-options" data-cnt="extended-filters" data-searchbar="filters">
                            <div class="column">
                                <div>
                                    <label for="age-value">Age</label>
                                    <p class="slider-text">
                                        {/* min input field */}
                                        <input type="text" id="age-value" name='minAge' onChange={(e) => handleChange(e)} data-field="minAge" value={values.minAge} />
                                        {/* max input field */}
                                        <input type="text" id="age-value" name='maxAge' onChange={(e) => handleChange(e)} data-field="maxAge" value={values.maxAge} />
                                    </p>
                                    <p></p>
                                    {/* <div class="slider ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"><div class="ui-slider-range ui-corner-all ui-widget-header" style={{ left: '11.1111%', width: '2.46914%' }}></div><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style={{ left: '11.1111%' }}></span><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default fa fa-dropdown" style={{ left: '13.5802%' }}></span></div> */}
                                </div>
                                <div class="form-field dropdowns">
                                    <select data-field="gender" name='gender' onChange={(e) => handleChange(e)} required="" data-type="dropdown">
                                        <option value="all" selected="">
                                            Gender        </option>
                                        <option value="Male">Man</option>
                                        <option value="Female">Woman</option>
                                    </select>
                                </div>
                                <div class="form-field dropdowns">
                                    <select data-field="region" name='region' onChange={(e) => handleChange(e)} required="" data-type="dropdown">
                                        <option value="all" selected="">
                                            All states </option>
                                        <option>Alabama</option>
                                        <option>Alaska</option>
                                        <option>Arizona</option>
                                        <option>Arkansas</option>
                                        <option>California</option>
                                        <option>Colorado</option>
                                        <option>Connecticut</option>
                                        <option>Delaware</option>
                                        <option>Florida</option>
                                        <option>Georgia</option>
                                        <option>Hawaii</option>
                                        <option>Idaho</option>
                                        <option>Illinois</option>
                                        <option>Indiana</option>
                                        <option>Iowa</option>
                                        <option>Kansas</option>
                                        <option>Kentucky</option>
                                        <option>Louisiana</option>
                                        <option>Maine</option>
                                        <option>Maryland</option>
                                        <option>Massachusetts</option>
                                        <option>Michigan</option>
                                        <option>Minnesota</option>
                                        <option>Mississippi</option>
                                        <option>Missouri</option>
                                        <option>Montana</option>
                                        <option>Nebraska</option>
                                        <option>Nevada</option>
                                        <option>New Hampshire</option>
                                        <option>New Jersey</option>
                                        <option>New Mexico</option>
                                        <option>New York</option>
                                        <option>North Carolina</option>
                                        <option>North Dakota</option>
                                        <option>Ohio</option>
                                        <option>Oklahoma</option>
                                        <option>Oregon</option>
                                        <option>Pennsylvania</option>
                                        <option>Rhode Island</option>
                                        <option>South Carolina</option>
                                        <option>South Dakota</option>
                                        <option>Tennessee</option>
                                        <option>Texas</option>
                                        <option>Utah</option>
                                        <option>Vermont</option>
                                        <option>Virginia</option>
                                        <option>Washington</option>
                                        <option>Washington, D.C.</option>
                                        <option>West Virginia</option>
                                        <option>Wisconsin</option>
                                        <option>Wyoming</option>
                                        </select>
                                </div>
                            </div>
                            <div class="column">
                                <div class="form-field dropdowns">
                                    <select onChange={(e) => handleChange(e)} id="appearance" name="appearance" data-field="appearance" data-required="false">
                                        <option selected="selected" value="default" disabled="">Appearance</option>
                                        <option value="all">All appearances</option>
                                        <option value="asian">Asian</option>
                                        <option value="ebony">Ebony</option>
                                        <option value="arabic">Arabic</option>
                                        <option value="white">White</option>
                                        <option value="latin">Latin</option>
                                        <option value="indian">Indian</option>
                                        <option value="mixed">Mixed</option>
                                        <option value="caucasian">Caucasian</option>
                                    </select>
                                </div>
                                <div class="form-field dropdowns">
                                    <select data-field="hairColor" name='hairColor' onChange={(e) => handleChange(e)} required="" data-type="dropdown">
                                        <option value="all" selected="">
                                            Hair
                                        </option>
                                        <option value="blond">Blond</option>
                                        <option value="darkblond">Dark blond</option>
                                        <option value="brown">Brown</option>
                                        <option value="black">Black</option>
                                        <option value="bald">Bald</option>
                                        <option value="red">Red</option>
                                        <option value="grey">Grey</option>
                                        <option value="colored">Other</option>
                                    </select>
                                </div>
                                {/* sortByAll */}
                                {/* <div className='button filter-search' onClick={()=> sortByAll(values.minAge, values.maxAge, values.gender, values.region, values.appearance, values.hairColor)}>Search</div> */}
                                {/* <div onClick={()=>generateMale()}  class="button filter-search" data-searchbutton="">Generate Male</div>
                                <div onClick={()=>generateFeMale()}  class="button filter-search" data-searchbutton="">Generate Female</div> */}
                            </div>
                        </div>
                    </div>
                    }

                    {/* </div> */}
                    <div className='container' onScroll={handleScroll}>
                        <div className="row tinderCards mx-auto">
                            <div className="tinderCards__cardContainer mx-auto">
                            {people.length === 0 && <div className='col-md-8' style={{ marginTop: '50px' }}>
                                <h4> No people found, please try again</h4>
                                <div className='button filter-search' onClick={()=> window.location.reload()}>Try again</div>
                            </div>}

                            {people.slice(0, lastIndex).map((person, index) => (
                            <SwipeCard key={person._id} data={person} onSwipe={handleSwipe} />
                            ))}
                              <div>{loading && hasMore && (
                            <div className="loader-container">
                                <div className="loader"></div>
                                </div>
                            )}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <SideBar />
            </div></>
    );
}

export default TinderCards;