class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :user_review, :rating, :location, :created_at, :user_id
  has_one :user
  # has_one :toy
end
