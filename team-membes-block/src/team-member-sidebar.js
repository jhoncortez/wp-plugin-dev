import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';

const TeamMemberSidebar = () => {

    // Get the current post type
    const postType = useSelect((select) => select('core/editor').getCurrentPostType(), []);

    // Only render the sidebar for the 'team-member' post type
    if (postType !== 'team-member') {
        return null;
    }

    const [meta, setMeta] = useEntityProp('postType', 'team-member', 'meta');

    return (
        <PluginDocumentSettingPanel
            name="team-member-sidebar"
            title={__('Team Member Details', 'team-membes-block')}
            className="team-member-sidebar"
        >
            <TextControl
                label={__('Position', 'team-membes-block')}
                value={meta.position || ''}
                onChange={(value) => setMeta({ ...meta, position: value })}
            />
            <TextControl
                label={__('Email', 'team-membes-block')}
                value={meta.email || ''}
                onChange={(value) => setMeta({ ...meta, email: value })}
            />
            <TextControl
                label={__('Social Links', 'team-membes-block')}
                value={meta.social_links || ''}
                onChange={(value) => setMeta({ ...meta, social_links: value })}
            />
        </PluginDocumentSettingPanel>
    );
};

registerPlugin('team-member-sidebar', {
    render: TeamMemberSidebar,
    icon: null,
});