import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
    IconBrandGithub,
    IconBrandGitlab,
    IconBrandGoogle,
} from '@tabler/icons-react';
import { FC } from 'react';

const SocialAuthButtons: FC = () => {
    return (
        <ButtonGroup aria-label="Social authentication" orientation="vertical">
            <Button variant="outline" type="button">
                <IconBrandGoogle />
                <span>Continue with Google</span>
            </Button>
            <Button variant="outline" type="button">
                <IconBrandGithub />
                <span>Continue with Github</span>
            </Button>
            <Button variant="outline" type="button">
                <IconBrandGitlab />
                <span>Continue with Gitlab</span>
            </Button>
        </ButtonGroup>
    );
};

export default SocialAuthButtons;
