import { FC } from 'react';

import { GetEditorialBoardQuery } from '@/gql/graphql';

import EditorialBoardMemberCard from './EditorialBoardMemberCard';

type EditorialBoardProps = {
  boardGroups: NonNullable<
    NonNullable<GetEditorialBoardQuery['EditorialBoard']>['boardGroups']
  >;
};

const EditorialBoard: FC<EditorialBoardProps> = (props) => {
  return (
    <div className="flex flex-col gap-y-10 items-center">
      {props.boardGroups?.map((boardGroup) => (
        <div key={boardGroup.heading} className="flex flex-col gap-y-2">
          <h3 className="text-dark-700 font-medium text-lg text-center">
            {boardGroup.heading}
          </h3>

          <div className="flex flex-wrap gap-4">
            {boardGroup.members?.map((member) => (
              <EditorialBoardMemberCard
                key={member.id}
                profileImageURL={member?.profileImage?.url ?? ''}
                name={member.name ?? ''}
                subtitle={member.subtitle ?? ''}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditorialBoard;
