/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreDataStore, useEntityProp } from '@wordpress/core-data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { layout, numberOfMembers, department } = attributes;

	const { getEntityRecords } = useSelect((select) => select(coreDataStore), [numberOfMembers, department]);
	const teamMembers = getEntityRecords('postType', 'post', {
		per_page: numberOfMembers,
		// department: department,
	});
	
	return (
		<>

			<InspectorControls>
				<PanelBody title={__('Layout Settings', 'team-membes-block')} initialOpen={true}>
					<SelectControl
						label={ __('Layout', 'team-membes-block') }
						value={ layout }
						options={ [
							{ label: 'Grid', value: 'grid' },
							{ label: 'List', value: 'list' },
						] }
						onChange={ ( pickedLayout ) => setAttributes( { layout: pickedLayout } ) }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				<PanelBody title={__('Data settings', 'team-membes-block')} initialOpen={false}>
					<RangeControl
						label={ __('Number of Members', 'team-membes-block') }
						value={ numberOfMembers }
						onChange={ ( value ) => setAttributes( { numberOfMembers: value } ) }
						min={ 1 }
						max={ 20 }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
					

			<div { ...useBlockProps() }>

				{ teamMembers && teamMembers.length > 0 ? (
					<ul className={ `team-members-layout-${ layout }` }>
						{ teamMembers.map( ( member ) => (
							<li key={ member.id } className="team-member">
								<h3>{ member.title.rendered }</h3>
								<div dangerouslySetInnerHTML={ { __html: member.excerpt.rendered } }></div>
							</li>
						) ) }
					</ul>
				)  : (
					<p>{ __( 'No team members found.', 'team-membes-block' ) }</p>
				) }	
				{/* { __(
					'Team Members Block – hello from the editor!',
					'team-membes-block'
				) } */}
			</div>
		
		</>
		
	);
}
