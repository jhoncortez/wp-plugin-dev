<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
// var_dump(get_block_wrapper_attributes() );
// var_dump($block);
if(!function_exists('get_random_avatar') ){
	function get_random_avatar(&$attributes){
	if ( ! isset( $attributes['avatar'] ) || ! is_array( $attributes['avatar'] ) ) {
		$attributes['avatar'] = array(
			'url'   => '',
			'title' => '',
		);
	}

	if ( empty( $attributes['avatar']['url'] ) ) {
		$attributes['avatar']['url'] = fetch_random_avatar();
	}
}
	
}

if(!function_exists('fetch_random_avatar') ){


	function fetch_random_avatar() {
		// Fetch a random avatar from an external API
		// For demonstration, we'll use the Random User Generator API
		$response = wp_remote_get('https://randomuser.me/api/');

		if (is_wp_error($response)) {
			// Handle error
			$error_message = $response->get_error_message();
			echo "Something went wrong: $error_message";
		} else {
			$body = wp_remote_retrieve_body($response);
			$data = json_decode($body);
			// Process the fetched data
			// foreach ($data as $post) {
			//     echo $post->title->rendered . '<br>';
			// }
			return $data->results[0]->picture->large;
		}
	}

}




?>
<div <?php echo get_block_wrapper_attributes([
		'class' => 'swiper-slide',
		// 'style' => 'color: #333',
	]); ?>>

	<?php if(empty($attributes["avatar"]["url"])) {  get_random_avatar($attributes); };
		 ?>
		<img src="<?php echo $attributes["avatar"]["url"]; ?>" alt="<?php echo $attributes["avatar"]["title"]; ?>" className="basic-carousel-item-avatar" /> 
		
				<h3 className="basic-carousel-item-name"><?php echo $attributes["name"]; ?></h3>
				<p className="basic-carousel-item-quote"><?php echo $attributes["quote"]; ?></p>
	</div>
