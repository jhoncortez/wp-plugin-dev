<?php
/**
 * Plugin Name:       Team Members Block
 * Description:       Block for team members
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       team-membes-block
 *
 * @package Jonny
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function jonny_team_membes_block_block_init() {
	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/{$block_type}" );
	}
}
add_action( 'init', 'jonny_team_membes_block_block_init' );

function register_tem_members_posttype(){

	$labels = array(
		'name' => __( 'Team Members', 'team-membes-block' ),
		'singular_name' => __( 'Team Member', 'team-membes-block' ),
	);

	$args = array(
		'labels' => $labels,
		'public' => true,
		'has_archive' => true,
		'show_in_rest' => true,
		'taxonomies' => array( 'department' ),
		"supports" => array( 'title', 'editor','custom-fields'),
		
	);

	register_post_type( 'team-member', $args );
}

add_action( 'init', 'register_tem_members_posttype' );

function register_department_taxonomy() {
	$labels = array(
		'name' => _x( 'Departments', 'taxonomy general name', 'team-membes-block' ),
		'singular_name' => _x( 'Department', 'taxonomy singular name', 'team-membes-block' ),
	);

	$args = array(
		'labels' => $labels,
		'public' => true,
		'show_in_rest' => true,
		'hierarchical' => true,
	);

	register_taxonomy( 'department', array( 'team-member' ), $args );
}
add_action( 'init', 'register_department_taxonomy' );

function team_members_custom_fields() {
	register_post_meta( 'team-member', 'position', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	) );

	register_post_meta( 'team-member', 'email', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	) );

	register_post_meta( 'team-member', 'social_links', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	) );
}

add_action('init', 'team_members_custom_fields');

/**
 * Enqueue the block editor script for the team member sidebar.
 */
function enqueue_team_member_sidebar_script() {
    $asset_file = include plugin_dir_path( __FILE__ ) . 'build/team-member-sidebar.asset.php';

    wp_enqueue_script(
        'team-member-sidebar',
        plugins_url( 'build/team-member-sidebar.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );
}
add_action( 'enqueue_block_editor_assets', 'enqueue_team_member_sidebar_script' );