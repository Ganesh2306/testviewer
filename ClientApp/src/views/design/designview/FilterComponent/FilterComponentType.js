import { DropDownBox, InputBox, DoubleRangeSlider, DesignRatings } from './FilterComponent'
import MultiSelectCompnent, { SingleColourComponent, RangeCalander } from './MultiSelectCompnent'

export const FilterComponentType = {

    0:(props) => {
                                        //!Fn
        return <InputBox key={props.k} label={props.name} onChange={props.onChange} list={props.list} reset={props.reset} />
    },
    1:(props) => {
                                        //!Fn                 //![]
        return <DropDownBox key={props.k} label={props.name} onChange={props.onChange} option={props.option} list={props.list} reset={props.reset}  selectRef={props.selectRef} />
    },
    2:(props) => {
       
                                        //!Fn                   //![]                   //! ""
        return <MultiSelectCompnent key={props.k} colourInfo={props.colourInfo} onChange={props.onChange} option={props.option} label={props.name} list={props.list} reset={props.reset} />
    },
    3:(props) => {
                                        //!Fn                 //![]
        return <DropDownBox key={props.k} label={props.name} onChange={props.onChange} option={props.option} list={props.list} reset={props.reset} />
    },
    4:(props) => {
                                        //!Fn                   //![]                   //! ""
        return <MultiSelectCompnent key={props.k} colourInfo={props.colourInfo} onChange={props.onChange} option={props.option} label={props.name} list={props.list} reset={props.reset} />
    },
    5:(props) => {
                                        //!Fn                   //![]                   //! ""
        return <MultiSelectCompnent key={props.k} colourInfo={props.colourInfo} onChange={props.onChange} option={props.option} label={props.name}  list={props.list} reset={props.reset}/>
    },
    6:(props) => {
                                        //!Fn                   //![]                   //! ""
        return <SingleColourComponent key={props.k} colourInfo={props.colourInfo} onChange={props.onChange} option={props.option} label={props.name} list={props.list} reset={props.reset} />
        },
    7:(props) => {
                                    //!
        return <DoubleRangeSlider key={props.k} onChange={props.onChange} 
        label={props.name ? props.name : ''} start={props.rs.range_Start} end={props.rs.range_End} 
        min={props.rs.range_Start} max={props.rs.range_End} step={props.rs.range_Difference} 
        isDouble={true} 
        list={props.list}
        reset={props.reset}
        />
    },
    8:(props) => {
        return <DoubleRangeSlider key={props.k} onChange={props.onChange} label={props.name ? props.name : ''} start={props.rs.range_Start} end={props.rs.range_End} 
        min={props.rs.range_Start} max={props.rs.range_End} 
        step={props.rs.range_Difference} isDouble={false}
        list={props.list}
        reset={props.reset}
        />
    },
    9:(props) => {
        return <RangeCalander key={props.k} label={props.name} reset={props.reset} onChange={props.onChange} /> //<FTDate onChange={props.onChange} label={props.name} />
    },
    10:(props) => {
        return <> <DesignRatings key={props.k} label={props.name} onChange={props.onChange} reset={props.reset} /> </>
    },
    undefined:() => {
        return <></>
    }

}

/* const {
    editbox, 0
    textdropdown, 1
    mulitselect_textdropdown, 2
    color_dropdown, 3
    color_multiselect_dropdown, 4
    color_textdropdown, 5
    color_multiselect_textdropdown, 6
    range_combobox, 7
    range_slider, 8
} */
//1000 5000
//1000+100
//1000+200
/* props = {
    onChange: (e) => e
}
props.onChange */