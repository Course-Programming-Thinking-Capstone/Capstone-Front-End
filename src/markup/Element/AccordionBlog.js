import React from 'react';
import { Accordion } from 'react-bootstrap';
	
const defaultAccordion = [
	{
	  title: '500 new items in the toy collection',
	  text:
		'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.',
	},
	{
	  title: 'Throwing birthday parties is fun and easy',
	  text:
		'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.',
	},
	{
	  title: 'Multiple benefits from buying a membership',
	  text:
		'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.',
	},
	{
	  title: 'Fresh snacks and beverages for everyone',
	  text:
		'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.',
	},
	{
	  title: 'Over 1 000 visitors for the last year',
	  text:
		'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.',
	},
		
]	
const AccordionBlog = () => {
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
export {defaultAccordion};
export default AccordionBlog;