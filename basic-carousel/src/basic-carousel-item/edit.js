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
import { useBlockProps, InspectorControls, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, Button  } from "@wordpress/components";

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
	const { name, quote, avatar } = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'basic-carousel-item' ) }>
					<TextControl
						label={ __( 'Name', 'basic-carousel-item' ) }
						value={ name }
						onChange={ ( value ) => setAttributes( { name: value } ) }
					/>
					<TextareaControl
						label={ __( 'Description', 'basic-carousel-item' ) }
						value={ quote }
						onChange={ ( value ) => setAttributes( { quote: value } ) }
					/>
					<MediaUpload
						onSelect={ ( media ) => setAttributes( { avatar: {title: media.title, url: media.url} } ) }
						allowedTypes={ [ 'image' ] }
						render={ ( { open } ) => (
							<Button onClick={ open }>
								{ ! avatar?.url ? __( 'Upload Image', 'basic-carousel-item' ) : (<p>Uploaded Image</p>) && avatar?.title }
							</Button>
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>
				{ avatar?.url && <img src={ avatar.url } alt={ avatar.title } className="basic-carousel-item-avatar" /> }
				<h3 className="basic-carousel-item-name">{ name }</h3>
				<p className="basic-carousel-item-quote">{ quote }</p>
				{/* { __( 'Basic Carousel Item – hello from the editor!', 'basic-carousel-item' ) } */}
			</div>
		</>
		
	);
}
