<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
var_dump( $attributes ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_var_dump
// var_dump( $content ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_var_dump
// var_dump( $block ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_var_dump
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php esc_html_e( 'Team Members Block – hello from a dynamic block!', 'team-membes-block' );?>


	<?php 
	$teamMembers = new WP_Query([
		'post_type' => 'post',
		'posts_per_page' => $attributes['numberOfMembers'] ?? 3,
		// 'department' => $attributes['department'] ?? '',
	]);

	while($teamMembers->have_posts()) {
		$teamMembers->the_post();
		echo '<p>'.get_the_title().'</p>';
	}
	wp_reset_postdata();
?>
</div>


