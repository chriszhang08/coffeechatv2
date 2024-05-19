import {TextInput, Checkbox, Button, Group, Box, Fieldset, Textarea, Title} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useMutation} from '@tanstack/react-query';
import {updateCoachProfileValues} from "@/utils/coachMethods";
import {useRouter} from "next/navigation";

interface ProfileValues {
  name: string;
  email: string;
  phone: string;
  bio: string;
}

export function EditProfileBadgeForm({coachId}
                                       : { coachId: string | null }) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      phone: '',
      bio: '',
    },

    validate: {
      name: (value) => (value.trim().length < 2 ? 'Name is too short' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => (/^\d{10}$/.test(value) ? null : 'Invalid phone number'),
      bio: (value) => (value.trim().length < 10 ? 'Bio is too short' : null),
    },
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (profileValues: ProfileValues) =>
      updateCoachProfileValues(coachId, profileValues),
    onSuccess: () => {
      router.push('/success');
    }
  });

  return (
    <Box maw={340} mx="auto" pt={24} px={10}>
      <Title order={1}>Edit Profile Info</Title>
      <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
        <Fieldset variant="unstyled">
          <TextInput
            withAsterisk
            label="Name"
            placeholder="John Doe"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <TextInput
            withAsterisk
            label="Phone"
            placeholder="+1(999)999-9999"
            key={form.key('phone')}
            {...form.getInputProps('phone')}
          />
          <Textarea
            withAsterisk
            label="Bio"
            placeholder="Tell us about yourself"
            key={form.key('bio')}
            {...form.getInputProps('bio')}
          />
        </Fieldset>

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit Profile Updates</Button>
        </Group>
      </form>
    </Box>
  );
}
