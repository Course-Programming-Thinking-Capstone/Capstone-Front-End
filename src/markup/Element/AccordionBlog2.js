import React from 'react';

import { Accordion} from 'react-bootstrap';
import {defaultAccordion} from './AccordionBlog';

const AccordionBlog2 = () => {	
	return(
		<>
			<Accordion  flush  className="accordion faq-box" >
				{defaultAccordion.map((d, i) => (
					<Accordion.Item eventKey={`${i}`}>
						<Accordion.Header>{d.title}</Accordion.Header>
						<Accordion.Body eventKey={`${i}`}>
							{d.text}
						</Accordion.Body>
					</Accordion.Item>
				))}				
			</Accordion>
		</>
		
	)
}

export default AccordionBlog2;