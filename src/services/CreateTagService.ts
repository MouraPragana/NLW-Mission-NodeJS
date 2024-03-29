import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';

interface IRequestTag {
  name: string;
}

class CreateTagService {
  async execute({ name }: IRequestTag) {
    const tagRepository = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new Error('Incorrect name!');
    }

    const tagAlreadyExists = await tagRepository.findOne({
      name
    });

    if (tagAlreadyExists) {
      throw new Error('Tag already exists!');
    }

    const tag = tagRepository.create({
      name
    });

    await tagRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };
